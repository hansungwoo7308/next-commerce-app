export default class APIfeatures {
  queryProducts: any;
  queryString: any;
  constructor(queryProducts: any, queryString: any) {
    this.queryProducts = queryProducts;
    this.queryString = queryString;
  }
  filter() {
    const { search, category, ratings, test } = this.queryString;
    let query: any = {};

    if (search) {
      query.name = { $regex: search };
      // this.queryProducts.find({ name: { $regex: search } });
      // query = { ...query, name: { $regex: search } };
    }
    if (category && category !== "all") {
      query.category = { $regex: category };
      // if (category === "all") {
      //   console.log({ category });
      //   return this;
      // }
      // this.queryProducts.find({ category: { $regex: category } });
      // query = { ...query, category: { $regex: category } };
    }
    if (ratings) {
      const ratingsArray = ratings.split("+").map((v: string) => Number(v));
      query.ratings = { $in: ratingsArray };
      // ratingsArray.map((value: any) => {
      //   this.queryProducts.find().or({ ratings: value });
      //   // this.queryProducts.find().or({ ratings: { $gte: value } });
      // });
    }

    this.queryProducts.find(query);
    // if (test) {
    //   const testArray = test.split("+");
    //   console.log({ testArray });
    //   // this.queryProducts.find({ name: { $or: testArray } });
    //   testArray.map((value: any) => {
    //     this.queryProducts.find().or({ name: { $regex: value } });
    //   });
    // }
    // if (ratings) this.queryProducts.find({ ratings: { $regex: Number(ratings) } });
    return this;
  }
  // filter() {
  //   // const searchQueries = { ...this.queryString };
  //   // console.log({ searchQueries });

  //   // const queryCopy = { ...this.queryString };
  //   // const removeFields = ["keyword", "page"];
  //   // removeFields.forEach((el) => delete queryCopy[el]);
  //   // let output:any = {};
  //   // let prop = "";
  //   // for (let key in queryCopy) {
  //   //   if (!key.match(/\b(gt|gte|lt|lte)/)) {
  //   //     output[key] = queryCopy[key];
  //   //   } else {
  //   //     prop = key.split("[")[0];
  //   //     let operator = key.match(/\[(.*)\]/)[1];
  //   //     if (!output[prop]) {
  //   //       output[prop] = {};
  //   //     }
  //   //     output[prop][`$${operator}`] = queryCopy[key];
  //   //   }
  //   // }
  //   // // { price: { $gte: 100, $lte: 1000 } }
  //   // this.queryProducts = this.queryProducts.find(output);
  //   return this;
  // }
  paginate() {
    // 요청된 페이지
    const page: number = Number(this.queryString.page) || 1;
    // 페이지 당 아이템
    const limit: number = 3;
    // 쿼리에서 스킵할 아이템
    const skip = (page - 1) * limit;
    // const limit: number = Number(this.queryString.limit) || 3;
    // const skip: number = (page - 1) * limit;
    // console.log({ page, limit, skip });
    // paginate
    this.queryProducts = this.queryProducts.skip(skip).limit(limit);
    // out
    return this;
  }
  // paginate() {
  //   // 요청된 페이지
  //   const page: number = Number(this.queryString.page) || 1;
  //   // 페이지 당 아이템
  //   const limit: number = 3;
  //   // 쿼리에서 스킵할 아이템
  //   const skip = (page - 1) * limit;
  //   // const limit: number = Number(this.queryString.limit) || 3;
  //   // const skip: number = (page - 1) * limit;
  //   // console.log({ page, limit, skip });
  //   // paginate
  //   this.queryProducts = this.queryProducts.skip(skip).limit(limit);
  //   // out
  //   return this;
  // }
  pagination() {
    // current page (ex : page1, page2, ...)

    const page = Number(this.queryString.page) || 1;
    // 가져올 페이지 수
    const limit = 3;
    // const limit = page * 3 || 3;
    // 스킵할 페이지 : 이전 페이지 (previous page)
    const skip = (page - 1) * limit;
    this.queryProducts = this.queryProducts.skip(skip).limit(limit);
    return this;
  }
}
