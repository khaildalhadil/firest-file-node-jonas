module.exports = (callBackData) => {
  return (req, res, next) => {
    callBackData(req, res, next).catch(next)
  }
}