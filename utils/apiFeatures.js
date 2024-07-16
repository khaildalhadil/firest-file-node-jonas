class APIFeatures {

  constructor(query, queryString) {
    // query = Tour.find()
    this.query = query;
    // queryString = req.query
    this.queryString = queryString;
  }

  filter() {
    const queryObj = {...this.queryString}

    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])

    let querStr = JSON.stringify(queryObj)
    querStr = querStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(querStr)); 

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(queryString.sort);
    }
    return this;
  }

  limiting() {
    if (this.queryString.limit) {
      console.log(limit, 'Hi');
      this.query = this.query.limit(queryString.limit)
    }

    return this
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    if(this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 3;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;

  }
}

module.exports = APIFeatures;