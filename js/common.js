/**
 * !本地存储
 * */
// localStorage.clear();//清除所有本地存储
// 诊所页面 筛选--- 区域 --- 类别
var APPcategoryPid = localStorage.getItem('categoryPid') || ''; //门诊ID
var APPpidName = localStorage.getItem('pidName') || ''; //门诊名字
var APPcategoryId = localStorage.getItem('categoryId') || ''; //科别ID
var APPcityId = localStorage.getItem('cityId') || ''; //城市ID
var APPcityName = localStorage.getItem('cityName') || ''; //城市ID
var APPareaId = localStorage.getItem('areaId') || ''; //区ID
var APPdistance = localStorage.getItem('distance') || ''; //距离

// 商城页面 筛选--- 区域 --- 类别
var APPlifecityName = localStorage.getItem('lifecityName') || ''; //城市名字
var APPlifecityId = localStorage.getItem('lifecityId') || ''; //城市ID
var APPlifeareaId = localStorage.getItem('lifeareaId') || ''; //区ID
var APPlifestoreId = localStorage.getItem('lifestoreId') || ''; //商圈ID
var APPlifedistance = localStorage.getItem('lifedistance') || ''; //距离

var APPstoreCateId = localStorage.getItem('storeCateId') || ''; //类别 id_1
var APPstoreCateId2 = localStorage.getItem('storeCateId2') || ''; //类别 id_2
var APPstoreCateId3 = localStorage.getItem('storeCateId3') || ''; //类别 id_3
var APPstoreCateId4 = localStorage.getItem('storeCateId4') || ''; //类别 id_4
var APPcategoryName = localStorage.getItem('categoryName') || ''; //类别 name

var APPswitch = localStorage.getItem('lifeSwitch') || ''; //开关 id
var APPscoreId = localStorage.getItem('scoreId') || ''; //评价 id
var APPserviceId = localStorage.getItem('serviceId') || ''; //服务 id
var APPtargetId = localStorage.getItem('targetId') || ''; //对象 id
var APPthemeId = localStorage.getItem('themeId') || ''; //特色主题 id
var APPstartPrice = localStorage.getItem('startPrice') || ''; //初始价格
var APPendPrice = localStorage.getItem('endPrice') || ''; //结束价格

/**
 * !清除存储
 * */
// 诊所
function clearIndex() {
  localStorage.removeItem('categoryPid');
  localStorage.removeItem('pidName');
  localStorage.removeItem('categoryId');
  localStorage.removeItem('cityId');
  localStorage.removeItem('cityName');
  localStorage.removeItem('areaId');
  localStorage.removeItem('distance');
}
// 商城
function clearLife() {
  localStorage.removeItem('lifecityName');
  localStorage.removeItem('lifecityId');
  localStorage.removeItem('lifeareaId');
  localStorage.removeItem('lifestoreId');
  localStorage.removeItem('lifedistance');
  localStorage.removeItem('storeCateId');
  localStorage.removeItem('storeCateId2');
  localStorage.removeItem('storeCateId3');
  localStorage.removeItem('storeCateId4');
  localStorage.removeItem('categoryName');
  localStorage.removeItem('lifeSwitch');
  localStorage.removeItem('scoreId');
  localStorage.removeItem('serviceId');
  localStorage.removeItem('targetId');
  localStorage.removeItem('themeId');
  localStorage.removeItem('startPrice');
  localStorage.removeItem('endPrice');
}
/**
 * !定时清除本地存储
 * */
function localStorageRemove() {
  ifvisible.setIdleDuration(7200); //设置监控时间，单位是s //设定2小时
  //闲置状态时，执行的函数
  ifvisible.idle(function () {
    console.log('您已超时')
    clearLife();
    clearIndex()
    window.location.href = "index.html";
  });
  //活跃状态时执行的函数
  ifvisible.wakeup(function () {
    console.log('活动状态')
  });
}

/*
 *选项卡切换
 *  menu：點擊對象
 *  cont：切換對象
 *  cur：选择时状态类命名
 */
// tabs切換隱藏
function tabs(menu, cont, cur) {
  menu.click(function () {
    var index = $(this).index();
    $(this).addClass(cur).siblings().removeClass(cur);
    cont.eq(index).show().siblings().hide();
  })
}

// 內容切換高亮
function active(menu, cur) {
  menu.click(function () {
    $(this).addClass(cur).siblings().removeClass(cur);
  })
}

// tabs($('.tabs-menu li'), $('.tabs-content'), 'cur');


/*
 * @ msg提示彈框
 *  content：设置弹层内容
 *  time - 控制自动关闭层所需秒数
 */
function msg(content, time) {
  layer.open({
    type: 0,
    content: content,
    skin: 'msg',
    time: time //2秒后自动关闭
  });
}

/**
 * ! 获取url参数
 */
function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      });
      // 设置参数值（如果为空则设置为true）
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      // paramName = paramName.toLowerCase();
      // paramValue = paramValue.toLowerCase();
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(paramValue);
        } else {
          obj[paramName][paramNum] = paramValue;
        }
      } else {
        obj[paramName] = paramValue;
      }
    }
  }
  if (typeof obj.token != 'undefined') {
    localStorage.setItem('token', obj.token);
  }
  if (typeof obj.system != 'undefined') {
    localStorage.setItem('system', obj.system);
  }
  if (typeof obj.lon != 'undefined') {
    localStorage.setItem('lon', obj.lon);
  }
  if (typeof obj.lat != 'undefined') {
    localStorage.setItem('lat', obj.lat);
  }
  if (typeof obj.industryFlagId != 'undefined') {
    localStorage.setItem('industryFlagId', obj.industryFlagId);
  }
  return obj;
}
// 调用   optionsArr参数数组，path路径
// var path = window.location.href;
// var optionsArr = getAllUrlParams(path);
// 普通调用 optionsArr.xxx
// 含文字调用 decodeURI(optionsArr.xxx);

Vue.component('black-top', {
  template: `<a class="black_top" href="javascript:;" id="btn" title="回到顶部"><i class="iconfont icon-huidaodingbu"></i></a>`
})


function appTurn(system, type, param,phone) {
  var obj = new Object();
  //type 1 去首页 2 我的  3订单列表  4关闭当前窗口
  if (type == undefined || type == "") {
    type = 4
  }
  obj.type = type;
  if (param != undefined && param != "") {
    obj.param = param;
  }
  if (phone != undefined && phone != "") {
    obj.phoneNum = phone;
  }
  console.log(obj,'obj')
  if (system == 1) {
    window.webkit.messageHandlers.appTurn.postMessage(JSON.stringify(obj));
  } else { //安卓
    window.android.appTurn(JSON.stringify(obj));
  }
}

function appTurn11(system, t1, t2, t3, t4, t5) {
  var obj = new Object();
  obj.type = 11; //type 1 去首页 2 我的  3订单列表  4关闭当前窗口
  obj.t1 = t1;
  obj.t2 = t2;
  obj.t3 = t3;
  obj.t4 = t4;
  obj.t5 = t5;
  console.log(obj);
  if (system == 1) {
    window.webkit.messageHandlers.appTurn.postMessage(JSON.stringify(obj));
  } else { //安卓
    window.android.appTurn(JSON.stringify(obj));
  }
}

function appTurn12(system, t1, t2, t3, t4, t5) {
  var obj = new Object();
  obj.type = 12; //type 1 去首页 2 我的  3订单列表  4关闭当前窗口
  obj.t1 = t1;
  obj.t2 = t2;
  obj.t3 = t3;
  obj.t4 = t4;
  obj.t5 = t5;
  console.log(obj);
  if (system == 1) {
    window.webkit.messageHandlers.appTurn.postMessage(JSON.stringify(obj));
  } else { //安卓
    window.android.appTurn(JSON.stringify(obj));
  }
}

function appTurn13(system, t1, t2, t3, t4, t5, t6, t7) {
  var obj = new Object();
  obj.type = 13; //type 1 去首页 2 我的  3订单列表  4关闭当前窗口
  obj.t1 = t1;
  obj.t2 = t2;
  obj.t3 = t3;
  obj.t4 = t4;
  obj.t5 = t5;
  obj.t6 = t6;
  obj.t7 = t7;
  console.log(obj);
  if (system == 1) {
    window.webkit.messageHandlers.appTurn.postMessage(JSON.stringify(obj));
  } else { //安卓
    window.android.appTurn(JSON.stringify(obj));
  }
}

$(document).ready(function () {
  //首先将#btn隐藏
  $("#btn").hide();
  $('.loader').css('display','none')
  //当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失

  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $("#btn").fadeIn(200);
    } else {
      $("#btn").fadeOut(200);
    }
  });
  //当点击跳转链接后，回到页面顶部位置
  $("#btn").click(function () {
    $('body,html').animate({
        scrollTop: 0
      },
      500);
    return false;
  });



});


function getPrice(trigger, dataArr) {
  new MobileSelect({
    trigger: trigger,
    title: '',
    wheels: [{
      data: dataArr
    }],
    position: [2], //初始化定位 打开时默认选中的哪个 如果不填默认为0
    transitionEnd: function (indexArr, data) {
      console.log(data);
    },
    callback: function (indexArr, data) {
      console.log(data);
    }
  });
}