function ListNode(val) {
		this.val = val
		this.next = null
}

 /**
 * @param {ListNode} head
 * @return {ListNode}
 */
let iterativeVersion = (head) => {
		let prev = null
		while (head) {
			let next = head.next
			head.next = prev
			prev = head
			head = next
		}
		return prev
}

let recursiveVersion = (head) => {
	if (!head || !head.next) return head
	let newHead = recursiveVersion(head.next)
	head.next.next = head
	head.next = null
	return newHead
}