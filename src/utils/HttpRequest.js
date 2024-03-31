import axios from "axios";

class HttpRequest {
  static async get(url) {
    try {
      const res = await axios({
        method: "GET",
        url,
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }

  static async post(url, data) {
    try {
      const res = await axios({
        method: "POST",
        url,
        data,
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // static async update(url, data) {
  //   try {
  //     const res = await axios({
  //       method: "PUT",
  //       url,
  //       data,
  //     });

  //     return res.data;
  //   } catch (err) {
  //     return err;
  //   }
  // }
  static async update(url, data) {
    try {
      const res = await axios({
        method: "PUT",
        url,
        data,
      });

      return res.data;
    } catch (err) {
      return err;
    }
  }
}

export default HttpRequest;
