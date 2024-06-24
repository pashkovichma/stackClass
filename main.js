class Stack {
    #maxSize;
    #elements;

    constructor(maxSize = 10) {
        if (typeof maxSize !== 'number' || maxSize <= 0 || !Number.isInteger(maxSize)) {
            throw new Error("Maximum size must be a positive integer");
        }
        this.#maxSize = maxSize;
        this.#elements = [];
    }

    push(elem) {
        if (this.#elements.length >= this.#maxSize) {
            throw new Error("The stack is full");
        }
        this.#elements.push(elem);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("The stack is empty");
        }
        return this.#elements.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.#elements.at(-1);
    }

    isEmpty() {
        return this.#elements.length === 0;
    }

    toArray() {
        return [...this.#elements];
    }

    static fromIterable(iterable) {
        if (iterable == null || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error("The entity is not iterable");
        }
        const stack = new Stack(iterable.length);
        for (const item of iterable) {
            stack.push(item);
        }
        return stack;
    }
}

try {
    const stack = new Stack(5);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.pop()); // 3
    console.log(stack.peek()); // 2
    console.log(stack.isEmpty()); // false
    console.log(stack.toArray()); // [1, 2]

    const iterableStack = Stack.fromIterable([2, 3, 4]);
    console.log(iterableStack.toArray()); // [2, 3, 4]

    const iterableString = Stack.fromIterable('ab');
    console.log(iterableString.toArray()); // [ 'a', 'b' ]

    
    const nonIterableObject = Stack.fromIterable({}); //The entity is not iterable

} catch (e) {
    console.error(`Error: ${e.message}`);
}
