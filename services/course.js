const CourseModel = require('../models/courses')
const faker = require('faker')

class Courses {
  async getCourses(req, res, next) {
    try {
      const courses = await CourseModel.find({})
      res.json(courses)
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
  async searchCourse(req, res, next) {
    try {
      const { query } = req.params
      const course = await CourseModel.find({ name: RegExp(query, 'i') })
      res.json(course)
    } catch (error) {
      res.status(500).json({ message: e.message })
      next()
    }
  }

  async generateFakeData(req, res, next) {
    try {
      const { amount } = req.params
      console.log(amount)
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
    } catch (error) {
      res.status(500).json({ message: e.message })
      next(error)
    }
  }

  async getListByPagination(req, res, next) {
    try {
      const params = req.params.page
      console.log(params)
    } catch (error) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
  async countList(req, res, next) {
    try {
      const courses = await CourseModel.find({})
      res.json({ amount: courses.length })
    } catch (error) {
      res.status(500).json({ message: e.message })
      next()
    }
  }
}
module.exports = Courses
