class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data, currentNode = this.root) {
    if (currentNode === null) {
      return new Node(data);
    }

    if (data < currentNode.data) {
      currentNode.left = this.insert(data, currentNode.left);
    } else if (data > currentNode.data) {
      currentNode.right = this.insert(data, currentNode.right);
    }

    return currentNode; // No change needed if data is equal (duplicates not allowed)
  }
}

// Example usage
const bst = new BinarySearchTree();
console.log(bst.insert(50));
console.log(bst.insert(30));
console.log(bst.insert(70));
console.log(bst.insert(20));
console.log(bst.insert(60));
console.log(bst.insert(80));
