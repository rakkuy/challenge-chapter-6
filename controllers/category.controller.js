const { category } = require("../models");

module.exports = {
  // Melakukan Create untuk Category
  // localhost:3000/api/v1/category/create
  create: async (req, res, next) => {
    try {
      const data = await category.create({
        data: {
          name: req.body.name,
          isActive: req.body.is_active,
        },
      });

      return res.status(201).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Melakukan update untuk Category dengan id
  // localhost:3000/api/v1/category/update/id
  update: async (req, res, next) => {
    try {
      const data = await category.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: req.body.name,
          isActive: req.body.is_active,
        },
      });

      return res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Untuk melihat data Category dengan id
  // localhost:3000/api/v1/category/id
  get: async (req, res, next) => {
    try {
      const data = await category.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Melakukan delete untuk Category dengan id
  // localhost:3000/api/v1/category/id
  destroy: async (req, res, next) => {
    try {
      const data = await category.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};
