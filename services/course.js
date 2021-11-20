const CourseModel = require('../models/courses')
const faker = require('faker')

class Courses {
  async getCourses(req, res, next) {
    try {
      const courses = await CourseModel.find({})
      res.json(courses)
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
  async newCourses(req, res, next) {
    try {
      const course = new CourseModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: faker.image.image()
      })
      await course.save()

      res.json(course)
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
  async getCourseById(req, res, next) {
    const course = await CourseModel.findById(req.params.idCourse)

    if (!course) {
      res.json({ msg: 'The course is not exist' })
      next()
    }
    res.json(course)
  }

  async updateCourse(req, res, next) {
    try {
      let { image, ...rest } = req.body
      image = faker.image.image()
      const newCourse = { image, ...rest }

      const course = await CourseModel.findOneAndUpdate({ _id: req.params.idCourse }, newCourse, {
        new: true
      })
      res.json(course)
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }

  async deleteCourse(req, res, next) {
    try {
      await CourseModel.findOneAndDelete({ _id: req.params.idCourse })
      res.json({
        msg: 'The course is deleted'
      })
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
  async searchCourse(req, res, next) {
    try {
      const { query } = req.params
      const course = await CourseModel.find({ name: RegExp(query, 'i') })
      res.json(course)
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }

  async generateFakeData(req, res, next) {
    try {
      const { amount } = req.params

      for (let i = 0; i < amount; i++) {
        const course = new CourseModel()
        course.name = faker.commerce.productName()
        course.price = faker.commerce.price()
        course.description = faker.commerce.productDescription()
        course.image = faker.image.image()
        await course.save()
      }
      res.json({
        msg: `${amount} record created`
      })
    } catch (e) {
      res.status(500).json({ message: e.message })
      next(e)
    }
  }

  async getListByPagination(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit)
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      const results = {}

      results.total = await CourseModel.countDocuments().exec()

      if (endIndex < (await CourseModel.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      results.items = await CourseModel.find().limit(limit).skip(startIndex).exec()

      res.json(results)
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
  async countList(req, res, next) {
    try {
      const courses = await CourseModel.find({})
      res.json({ amount: courses.length })
    } catch (e) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
}
module.exports = Courses
