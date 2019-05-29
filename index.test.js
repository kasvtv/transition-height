const pkg = require('.');

const { toggle, expand, collapse } = pkg;

test('toggle should be equal to export default', () => {
	expect(pkg.toggle).toBe(toggle);
});

const getMockDiv = (props = {}) => {
	const div = document.createElement('div');

	Object.entries(props).map(([key, value]) => (
		Object.defineProperty(div, key, { value })
	));

	return div;
};

const awaitNextAnimationFrame = () => {
	let resolve;
	const prom = new Promise(r => { resolve = r; });

	requestAnimationFrame(resolve);
	return prom;
};

const scrollHeight = 80;
const transition = Symbol('transitionValue');
const animateTo = 10;

describe('GIVEN a div element', () => {

	describe('WHEN expand is called with that div', () => {

		it("THEN the element's height style is set to its own scrollHeight", () => {

			const div = getMockDiv({
				style: {},
				scrollHeight,
			});

			expand(div);
			expect(parseInt(div.style.height)).toBe(scrollHeight);

		});

		describe('WHEN transitionend fires AND its height remains unchanged', () => {
			it('THEN its height unsets again', () => {

				const div = getMockDiv({
					style: {},
					scrollHeight,
				});

				expand(div);

				div.dispatchEvent(new Event('transitionend'));
				expect(div.style.height).toBeNull();

			});
		});


		describe('WHEN transitionend fires AND its height style has been modified', () => {
			it('THEN its height style doesnt change any further', () => {

				const div = getMockDiv({
					style: {},
					scrollHeight,
				});

				expand(div);

				const newHeight = 10;
				div.style.height = newHeight;

				div.dispatchEvent(new Event('transitionend'));
				expect(div.style.height).toBe(newHeight);

			});
		});

		describe('WHEN transitionend fires multiple times after', () => {
			it('THEN only the first time can unset its height style', () => {

				const div = getMockDiv({
					style: {},
					scrollHeight,
				});

				expand(div);

				const newHeight = 10;
				div.style.height = newHeight;

				div.dispatchEvent(new Event('transitionend'));
				expect(div.style.height).toBe(newHeight);

				div.style.height = scrollHeight;

				div.dispatchEvent(new Event('transitionend'));
				expect(div.style.height).toBe(scrollHeight);


			});
		});

	});

	describe('WHEN collapse is called with that div', () => {

		it('THEN unset its transition', () => {

			const div = getMockDiv({
				style: { transition },
				scrollHeight,
			});

			collapse(div);
			expect(div.style.transition).toBeFalsy();

		});

		describe('WHEN the next animation frame have been rendered', () => {
			it('THEN its height style should be hardcoded to its current height'
				+ ' AND its transition should be unchanged again', async () => {

				const div = getMockDiv({
					style: { transition },
					scrollHeight,
				});

				collapse(div);
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(scrollHeight);
				expect(div.style.transition).toBe(transition);

			});

		});

		describe('WHEN the next 2 animation frames have been rendered', () => {
			it('THEN its height style should be 0', async () => {

				const div = getMockDiv({
					style: { transition },
					scrollHeight,
				});

				collapse(div);

				await awaitNextAnimationFrame();
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(0);

			});
		});

	});

	describe('WHEN collapse is called with that div and a number X', () => {

		describe('WHEN the next 2 animation frames have been rendered', () => {
			it('THEN its height style should be set to to X', async () => {

				const div = getMockDiv({
					style: { transition },
					scrollHeight,
				});

				collapse(div, animateTo);

				await awaitNextAnimationFrame();
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(animateTo);

			});
		});

	});

	describe('WHEN toggle is called with that div', () => {

		describe('WHEN its height style is 0', () => {
			it('THEN it will expand to its full height and return true', async () => {

				const div = getMockDiv({
					style: { height: 0 },
					scrollHeight,
				});

				const result = toggle(div);

				await awaitNextAnimationFrame();
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(scrollHeight);
				expect(result).toBe(true);

			});
		});

		describe('WHEN its height style is not 0', () => {
			it('THEN collapse to 0 height and return false', async () => {

				const div = getMockDiv({
					style: { height: 42 },
					scrollHeight,
				});

				const result = toggle(div);

				await awaitNextAnimationFrame();
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(0);
				expect(result).toBe(false);

			});
		});

	});

	describe('WHEN toggle is called with that div and a number X', () => {

		describe('WHEN its height style is less than or equal X', () => {
			it('THEN it will expand to its full height and return true', async () => {

				const div = getMockDiv({
					style: { height: animateTo - 1 },
					scrollHeight,
				});

				const result = toggle(div, animateTo);

				await awaitNextAnimationFrame();
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(scrollHeight);
				expect(result).toBe(true);

			});
		});

		describe('WHEN its height style is more than X', () => {
			it('THEN it will collapse to 0 height and return false', async () => {

				const div = getMockDiv({
					style: { height: 42 },
					scrollHeight,
				});

				const result = toggle(div);

				await awaitNextAnimationFrame();
				await awaitNextAnimationFrame();

				expect(parseInt(div.style.height)).toBe(0);
				expect(result).toBe(false);

			});
		});

	});
});