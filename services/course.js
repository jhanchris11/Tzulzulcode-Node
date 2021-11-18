const CourseModel = require('../models/courses')
// const multer = require('multer')
// const configMulter = require('../utils/configMulter')
const faker = require('faker')

// const upload = multer(configMulter).single('image')
class Courses {
  async getCourses(req, res, next) {
    try {
      const courses = await CourseModel.find({})
      res.json(courses)
    } catch (error) {
      console.log(`error `, error)
      next()
    }
  }
  async newCourses(req, res, next) {
    try {
      const course = new CourseModel()
      console.log(course)
      course.name = req.body.name_course
      course.price = req.body.price_course
      course.description = req.body.description_course
      course.image = faker.image.image()
      console.log(course)
      // await course.save()
      // res.json(course)
    } catch (error) {
      console.log(`newCourses`, error)
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
      const course = await CourseModel.findOneAndUpdate({ _id: req.params.idCourse }, req.body, {
        new: true
      })
      res.json(course)
    } catch (error) {
      console.log(`updateCourses`, error)
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
      console.log(`deleteCourses`, error)
      next()
    }
  }
  async searchCourse(req, res, next) {
    try {
      const { query } = req.params
      const course = await CourseModel.find({ name: RegExp(query, 'i') })
      res.json(course)
    } catch (error) {
      console.log(`deleteCourses`, error)
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
      console.log(`generateData`, error)
      next(error)
    }
  }

  async getListByPagination(req, res, next) {
    try {
    } catch (error) {
      console.log(`getListByPagination`, error)
      next()
    }
  }
  async countList(req, res, next) {
    try {
      const courses = await CourseModel.find({})
      res.json({ amount: courses.length })
    } catch (error) {
      console.log(`countList`, error)
      next()
    }
  }
}
module.exports = Courses
