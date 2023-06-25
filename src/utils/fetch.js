// 将js对象转换为URL查询字符串

class FetchRequest {
  constructor() {
    this.baseUrl = "http://192.168.0.1:9007"; // 替换成自己的服务
    this.headers = {
    
    };
  }
  async getHttpHeader() {
    return new Promise((resolve, reject) => {
      resolve({
        ...this.headers,
        token: localStorage.getItem('dbt_token')
      });
    });
  }
  async get(url, params = {}) {
    let xBase = this.baseUrl;
    if (url && url.indexOf("http") == 0) {
      xBase = "";
    }

    url = new URL(`${xBase}${url}`);
    url.search = new URLSearchParams(params).toString();
    let currHeader = await this.getHttpHeader();
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        ...currHeader,
      },
      ...params,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    const data = await response.json();

    return data;
  }

  async post(url, data = {}, params = {}) {
    let xBase = this.baseUrl;
    if (url && url.indexOf("http") == 0) {
      xBase = "";
    }
    let currHeader = await this.getHttpHeader();
    const response = await fetch(`${xBase}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...currHeader,
      },
      credentials: "include",
      body:
        !data || Object.keys(data).length === 0 ? null : JSON.stringify(data),
      ...params,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    const responseData = await response.json();

    return responseData;
  }
  async postFile(url, data = {}, params = {}) {
    let currHeader = await this.getHttpHeader();
    let xUrl = "";
    if (url.indexOf("http") === 0) {
      xUrl = url;
    } else {
      xUrl = `${this.baseUrl}${url}`;
    }
    const response = await fetch(xUrl, {
      method: "POST",
      headers: {
        ...currHeader,
      },
      credentials: "include",
      body: data,
      ...params,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    const responseData = await response.json();

    return responseData;
  }

  // 数组转换为表单数据
  async postFormData(url, data = {}) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    const responseData = await response.json();
    return responseData;
  }

  authFailed() {
    console.log('authFailed')
  }

  async getEncrypt(url, params = {}, options = {}) {
    let { headers, ...restOpt } = options || {};
    let xBase = this.baseUrl;
    if (url && url.indexOf("http") == 0) {
      xBase = "";
    }

    let sendParams = "";


    url = new URL(`${xBase}${url}`);
    url.search = new URLSearchParams(sendParams).toString();
    let currHeader = await this.getHttpHeader();
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        ...currHeader,
        ...headers,
      },
      ...restOpt,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.authFailed();
      }
      throw new Error(`Failed to fetch ${url}`);
    }

    const responseData = await response.json();

    return responseData;
  }

  async postEncrypt(url, data = {}, params = {}) {
    let { headers, ...restParams } = params || {};
    let xBase = this.baseUrl;
    if (url && url.indexOf("http") == 0) {
      xBase = "";
    }

    let sendParams = null;

    console.log("request data ===>", data);



    let currHeader = await this.getHttpHeader();
    const response = await fetch(`${xBase}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...currHeader,
        ...headers,
      },
      credentials: "include",
      body: sendParams ? JSON.stringify(sendParams) : null,
      ...restParams,
    });

    if (!response.ok) {
      console.log("======================>", response);
      if (response.status === 401) {
        this.authFailed();
      }
      throw new Error(`Failed to fetch ${url}`);
    }

    const responseData = await response.json();

   
    console.log(`${url} ===>`, responseData)

    return responseData;
  }
}
/**
 * 将Uint8Array转换为字符串
 * @param {Uint8Array} fileData
 * @returns
 */
const Uint8ArrayToString = (fileData) => {
  const utf8 = Array.from(fileData)
    .map((item) => String.fromCharCode(item))
    .join("");

  return decodeURIComponent(escape(utf8));
};

export default FetchRequest;
