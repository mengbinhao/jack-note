var inorderTraversal = function (root) {
	let ret = []
	//exNode是当前root中序遍历左子树的最后一个节点
	let exNode = null
	while (root) {
		//存在左子树先找当前root的exNode
		if (root.left) {
			//exNode为当前root左走一步，然后一直右走直到走不了
			exNode = root.left
			//因会连辅助线，加第二个判断
			while (exNode.right && exNode.right !== root) {
				exNode = exNode.right
			}
			//没有辅助线增加，否则断开继续查询右子树000
			if (!exNode.right) {
				//exNode右指针指向root,增加辅助线，继续遍历左子树
				exNode.right = root
				root = root.left
				//左子树已遍历完，断开辅助线，继续遍历右子树
			} else {
				ret.push(root.val)
				exNode.right = null
				root = root.right
			}
			//上面连的辅助线， D回到B
		} else {
			ret.push(root.val)
			root = root.right
		}
	}
	return ret
}
