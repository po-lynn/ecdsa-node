class TXO {
  constructor(owner, amount) {
    this.owner = owner;
    this.amount = amount;
    this.spent = false;
  }
  spend() {
    this.spent = true;
    return this.spent;
  }
}

// const txo = new TXO("1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM", 10);

// console.log(txo.owner); // 1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM
// console.log(txo.amount); // 10
// console.log(txo.spent); // false

// console.log(txo.spent); // true
// class Transaction {
//   constructor(inputUTXOs, outputUTXOs) {
//     this.transaction = { inputUTXOs, outputUTXOs };
//   }
//   execute() {
//     for (const inputUTXO of this.transaction.inputUTXOs) {
//       if (inputUTXO.spent) {
//         throw error();
//       }
//     }
//   }
// }

// const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
// const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

// const inputTXO1 = new TXO(fromAddress, 5);
// const inputTXO2 = new TXO(fromAddress, 5);
// const outputTXO1 = new TXO(toAddress, 10);
// const tx = new Transaction([inputTXO1, inputTXO2], [outputTXO1]);
// inputTXO1.spend();

// tx.execute();

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
/*
class Tree {
  constructor() {
    this.root = null;
  }
  addNode(node) {
    if (this.root == null) {
      this.root = node;
    } else if (node.data < this.root.data) {
      this.root.left = node;
    } else {
      this.root.right = node;
    }
  }
}

const tree = new Tree();
const node1 = new Node(5);
const node2 = new Node(3);
const node3 = new Node(7);

tree.addNode(node1);
tree.addNode(node2);
tree.addNode(node3);

console.log(tree.root.left.data); // 3
console.log(tree.root.right.data); // 7
*/
class Tree {
  constructor() {
    this.root = null;
  }

  //itrations
  addNode(node) {
    if (this.root == null) {
      this.root = node;
      return;
    }
    let currentNode = this.root;
    while (true) {
      if (node.data < currentNode.data) {
        if (currentNode.left == null) {
          currentNode.left = node;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = node;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }
  hasNode(number) {
    let currentNode = this.root;

    while (currentNode.data != number) {
      if (number < currentNode.data) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          return false;
        }
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          return false;
        }
      }
    }
    if (currentNode.data == number) {
      return true;
    } else {
      return false;
    }
  }
}

// recursive
//   addNode(node, currentNode = this.root) {
//     if (currentNode === null) {
//       currentNode = node;
//       this.root = node;
//       return;
//     }

//     if (node.data < currentNode.data) {
//       this.root.left = node;
//       this.addNode(node, this.root.left);
//     } else if (node.data > currentNode.data) {
//       this.root.right = node;
//       this.addNode(node, this.root.right);
//     }
//   }
// }
const tree = new Tree();
tree.addNode(new Node(5));
console.log(tree.root.data); //, 5;
tree.addNode(new Node(3));
console.log(tree.root.left.data); //, 3;
tree.addNode(new Node(2));
console.log(tree.root.left.left.data); //2
tree.addNode(new Node(4));
tree.addNode(new Node(7));
console.log(tree.root.right.data); //7

tree.addNode(new Node(6));
console.log(tree.root.right.left.data);

tree.addNode(new Node(8));
console.log(tree.root.right.right.data);
console.log(tree.hasNode(4));
console.log(tree.hasNode(6));
