const { Router } = require('express')
const CoursesServices = require('../services/course')
const CourseModel = require('../models/courses')
const Course = new CoursesServices()
const router = Router()

router.get('/welcome', (req, res) => {
  res.status(200).json('Welcome')
})

router.get('/courses', Course.getCourses)

router.get('/courses/:idCourse', Course.getCourseById)

router.get('/courses/generate-fake-data/:amount', Course.generateFakeData)

router.get('/count', Course.countList)

router.post('/courses', Course.newCourses)

router.put('/courses/:idCourse', Course.updateCourse)

router.delete('/courses/:idCourse', Course.deleteCourse)

router.post('/courses/search/:query', Course.searchCourse)

router.get('/courses/:page', Course.getListByPagination)

module.exports = router
