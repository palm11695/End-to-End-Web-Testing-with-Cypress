let x: string = "test";
let yes: boolean = false;

describe('exercise on tests classification', () => {
    it('returns true', () => {
        expect(typeof(x)).to.equal('string');
    });

    it('returns fail', () => {
        expect(typeof(x)).to.equal('undefined');
    });

    it.skip('it skips', () => {
        expect(yes).to.equal(true);
    });
});