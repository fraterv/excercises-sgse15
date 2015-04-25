var literal = value => ({ content: value });

var square = par => {
    return par * par;
};

var mult = (par1, par2) => {
    return par1 * par2;
};

var greater = (par1, par2) => {
    if (par1 > par2) {
	return 1;
    }
    else if (par2 > par1) {
	return 2;
    }
    else {
	return "none";
    };
};

function exec() {
    document.write(literal("content").content);
    document.write("4*4 is " + square(4));
    document.write("4*5 is " + mult(4, 5));
    document.write("Larger one of 5 and 4 is: " + greater(5, 4));
    document.write("Larger one of 5 and 6 is: " + greater(5, 6));
    document.write("Larger one of 5 and 5 is: " + greater(5, 5));
}
