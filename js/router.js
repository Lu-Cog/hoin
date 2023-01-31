var cBaseUrl = "https://hoin.iqweb.net/app.php/"; //our server new
var system = localStorage.getItem('system');
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// var isiOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

/**
 * axios请求
 * @param {*} url 请求URL
 * @param {*} method 请求METHOD
 * @param {*} params  请求参数
 * @param {*} okway 请求成功回掉数据
 */
function axiosRequest(url, method, params, okway,noway) {
  params.token = '5d7fcad1f4bec267c737ef232fce4b3d';
  // params.token = localStorage.getItem('token');
  if(!params.token){
    if (isAndroid) {
      appTurn(system, 4)
      appTurn(system, 3)
    }else{
      appTurn(system, 4)
      appTurn(system, 5)
    }
    return

  }
  params.system = localStorage.getItem('system');
  params.lon = localStorage.getItem('lon');
  params.lat = localStorage.getItem('lat');
  var config = {
    method: method,
    headers: {},
    url: cBaseUrl + url,
    params: params
  }
  //开始请求
  axios(config).then(function (res) {
    console.log("res.data", res.data)
    if (res.data.code == 200 || res.data.code == 0) {
      okway(res.data.data);
    } else if(res.data.code == -200){
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg(res.data.msg);
      });
      setTimeout(()=>{
        if (isAndroid) {
          appTurn(system, 4)
          appTurn(system, 3)
        }else{
          appTurn(system, 4)
          appTurn(system, 5)
        }
      },600)
    } else {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg(res.data.msg);
      });
      noway(params);
    }
  }).catch(function (error) {
    console.log(error);
  });
}

/**
 * ?获取地区数据
 */
function getArea(params, ret) {
  axiosRequest('index/area', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * 获取诊所列表
 * @param {*} params 请求参数
 * @param {*} ret 请求成功回掉参数
 */
function clinicList(params, ret) {
  axiosRequest('clinic/clinicList', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * 获取诊所/医生类别
 * @param {*} params 请求参数
 * @param {*} ret 请求成功回掉参数
 */
function categoryList(params, ret) {
  axiosRequest('clinic/cliDocCategory', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 诊所详情
 */
function clinicInfo(params, ret) {
  axiosRequest('clinic/clinicInfo', 'GET', params, function (res) {
    ret(res)
  });
}


/**
 * ? 医生列表
 */
function doctorList(params, ret) {
  axiosRequest('clinic/doctorList', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 医生详情
 */
function doctorItem(params, ret) {
  axiosRequest('clinic/doctorInfo', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 可预约预约状态信息展示
 */
function apointInfo(params, ret) {
  axiosRequest('clinic/sureReserveInfo', 'GET', params, function (res) {
    ret(res)
  });
}


/**
 * ? 预约信息提交
 */
function reserveSub(params, ret) {
  axiosRequest('clinic/reserveSub', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 商城轮播图
 */
function lifeSwiper(params, ret) {
  axiosRequest('store/banner', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 商城列表
 */
function lifeList(params, ret) {
  params.industryFlagId = localStorage.getItem('industryFlagId');
  axiosRequest('store/lists', 'GET', params, function (res) {
    ret(res)
  });
}


/**
 * ? 商城分类
 */
function storeCategory(params, ret) {
  axiosRequest('Store/categoryList', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 商城进阶分类
 */
function otherCategory(params, ret) {
  axiosRequest('Store/otherCategory', 'GET', params, function (res) {
    ret(res)
  });
}


/**
 * ? 商家信息/详情
 */
function storeInfo(params, ret) {
  axiosRequest('Store/detail', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 商家信息/详情
 */
function storeInformation(params, ret) {
  axiosRequest('Store/getInformation', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 商品列表
 */
function goodsList(params, ret) {
  axiosRequest('Goods/lists', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 商品详情
 */
function goodsInfo(params, ret) {
  axiosRequest('Goods/goods_info', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 购物车列表
 */
function cartList(params, ret) {
  axiosRequest('cart/cart_list', 'GET', params, function (res) {
    ret(res)
  });
}


/**
 * ? 加入购物车
 */
function cartAdd(params, ret) {
  axiosRequest('cart/cart_add', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 删除购物车
 */
function cartDelete(params, ret) {
  axiosRequest('cart/cart_delete', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 预约详情
 */
function userReserveInfo(params, ret) {
  axiosRequest('clinic/userReserveInfo', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 预约列表
 */
function userReserveList(params, ret) {
  axiosRequest('clinic/userReserveList', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 收藏/取消收藏店铺
 */
function storeCollection(params, ret) {
  axiosRequest('Store/storeCollection', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 会员评分商家
 */
function supplyScore(params, ret) {
  axiosRequest('Store/setSupplyScore', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 获取商家评论列表
 */
function supplyScoreList(params, ret) {
  axiosRequest('Store/getSupplyScoreList', 'POST', params, function (res) {
    ret(res)
  });
}


/**
 * ? 获取商家评论列表
 */
function feedbackInfo(params, ret) {
  axiosRequest('user/getFeedbackInfo', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 获取商家文章资讯
 */
function supplyArticleList(params, ret) {
  axiosRequest('Store/getSupplyArticleList', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 订单提交
 */
function orderSubmit(params, ret) {
  axiosRequest('order/order_submit', 'POST', params, function (res) {
    ret(res)
  });
}

function neWebPay(params, ret) {
  axiosRequest('order/gtpay_order', 'POST', params, function (res) {
    ret(res)
  });
}

/**
 * ? 订单确认页面
 */
function orderView(params, ret) {
  axiosRequest('order/order_view', 'GET', params, function (res) {
    ret(res)
  });
}
/**
 * ? 订单列表
 */
function orderList(params, ret) {
  axiosRequest('order/order_list', 'GET', params, function (res) {
    ret(res)
  });
}

/**
 * ? 订单詳情
 */
function orderInfo(params, ret) {
  axiosRequest('order/order_info', 'GET', params, function (res) {
    ret(res)
  });
}

function orderViewS(params, ret) {
  axiosRequest('order/h5_order_info', 'GET', params, function (res) {
    ret(res)
  });
}

function couponCategory(params, ret) {
  axiosRequest('coupons/coupon_category', 'POST', params, function (res) {
    ret(res)
  });
}

function couponList(params, ret) {
  axiosRequest('coupons/user_coupon_list', 'POST', params, function (res) {
    ret(res)
  });
}

function couponInfo(params, ret, rep) {
  axiosRequest('coupons/coupon_info', 'POST', params, function (res) {
    ret(res)
  },function (res) {
    rep(res)
  });
}

function couponDel(params, ret) {
  axiosRequest('coupons/coupon_del', 'POST', params, function (res) {
    ret(res)
  });
}

function couponHistory(params, ret) {
  axiosRequest('coupons/coupon_history', 'POST', params, function (res) {
    ret(res)
  });
}
function getCoupon(params, ret) {
  axiosRequest('coupons/get_coupon', 'POST', params, function (res) {
    ret(res)
  });
}

function getOrderList(params, ret) {
  axiosRequest('order/order_list', 'get', params, function (res) {
    ret(res)
  });
}

function getOrderInfo(params, ret) {
  axiosRequest('order/order_info', 'get', params, function (res) {
    ret(res)
  });
}

function storeCouponList(params, ret) {
  axiosRequest('coupons/store_coupon_list', 'post', params, function (res) {
    ret(res)
  });
}

function homeCouponList(params, ret) {
  axiosRequest('coupons/home_coupon_list', 'post', params, function (res) {
    ret(res)
  });
}


function couponCheck(params, ret) {
  axiosRequest('coupons/coupon_check', 'post', params, function (res) {
    ret(res)
  });
}
