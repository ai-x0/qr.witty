import FetchRequest from '../fetch.js'

const request = new FetchRequest()
export default {
  generateQRCode: (data) => request.getEncrypt('/api/monkey/generateQRCode', data), //获取风格
  appLogin: (data) => request.getEncrypt('/api/user/appLogin', data), // 登录
  uploadFiletoAli: (data) => request.postFile('/api/common/uploadFiletoAli', data),
  getResult: (data) => request.getEncrypt('/api/monkey/getResult', data), // 轮询获取图片数据
}
