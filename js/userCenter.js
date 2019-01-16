(function(){
	l.id('logoutBtn').click(function(){
		l.ajax({
			url:'index.ctrl.php?c=logout',
			method:'get',
			callback:function(){
				window.location.href = 'userCenter.php';
			}
		})
	})
}())