//require bmob-min.js
(function(w,d){
	var DB = function(table){
		//init Bmob baas
		var APPID = '96bd99705c685df49da85583d42d50ce';
		var RESTKEY = '51690b00757c051873fc8e712a78ecb5';
		Bmob.initialize(APPID,RESTKEY);

		this.table = table ? Bmob.Object.extend(table) : null;
		this.model = new this.table();
		this.query = "";
	}
	DB.prototype = {
		/**
		 * 重新选择表
		 * @param {str} table 表名
		 */
		setTable:function(table){
			this.table = Bmob.Object.extend(table);
			this.model = new this.table();
		},
		/**
		 * 添加
		 * @param {obj} data = {
		 *                   	data:obj 要上传的数据,
		 *                   	callback:obj 回调函数{
		 *                   		success: func 成功时的回调,
		 *                   		error:func 失败时的回调
		 *                   	}
		 *                  }
		 */
		save:function(data){
			this.model.save(data.data,data.callback);
		},
		/**
		 * 临时添加数据，在save()之前调用才有效
		 * @param {str} key   字段
		 * @param {multi} value 值
		 */
		set:function(key,value){
			this.model.set(key,value)
		},
		initQuery:function(){
			this.query = new Bmob.Query(this.table);
		},
		destoryQuery:function(){
			this.query = null;
		},
		//小于
		l:function(key,value){
			this.qeury.lessThan(key,value);
		},
		//小于等于
		L:function(key,value){
			this.query.lessThanOrEqualTo(key,value);
		},
		//大于
		g:function(key,value){
			this.query.greaterThan(key,value);
		},
		//大于等于
		G:function(key,value){
			this.query.greaterThanOrEqualTo(key,value);
		},
		//等于
		e:function(key,value){
			this.query.equalTo(key,value);
		},
		//不等于
		E:function(key,value){
			this.query.notEqualTo(key,value);
		},
		/**
		 * 设置获取数据的条数
		 * @param  {int} num 数据条数
		 * @return {[type]}     [description]
		 */
		limit:function(num){
			this.query.limit(num);
		},
		/**
		 * 跳过多少条数据和limit组合使用就可实现翻页
		 * @param  {int} num 数据条数
		 * @return {[type]}     [description]
		 */
		skip:function(num){
			this.query.skip(num);
		},
		//将数据以KEY正序排列
		asc:function(key){
			this.query.ascending(key);
		},
		//将数据以KEY倒序排列
		desc:function(key){
			this.query.descending(key);
		},
		//返回指定字段
		select:function(keys){
			this.query.select(keys);
		},
		findAll:function(callback){
			// var _query = new Bmob.Query(this.table);
			this.query.find({
				success:function(ret){
					callback.success.call(ret);
				},
				error:function(err){
					callback.error.call(err);
				}
			})
		},
		findOne:function(callback){
			// var _query = new Bmob.Query(this.table);
			this.query.first({
				success:function(ret){
					callback.success.call(ret);
				},
				error:function(err){
					callback.error.call(err);
				}
			})
		},
		find:function(id,callback){
			this.query.get(id,{
				success:function(ret){
					callback.success.call(ret);
				},
				error:function(err){
					callback.error.call(err);
				}
			})
		},
		countData:function(callback){
			this.query.count({
				success:function(ret){
					callback.call(ret);
				},
				error:function(err){
					callback.error.call(err);
				}
			})
		}

	}
	DB.init = function(){
	   var APPID = '48ee03a0368e4e192ac9f004f1399e3d';
	   var RESTKEY = '1686cf77cfe000a5267590c9071e19fe';
	   Bmob.initialize(APPID,RESTKEY);
	}
	DB.mkFile = function(name,file){
			return new Bmob.File(name,file);
		}
	DB.upFile = function(name,file){
		DB.init();
		var _file = DB.mkFile(name,file);
		_file.save();
	}

	w.DB = DB;
}(window,document))
