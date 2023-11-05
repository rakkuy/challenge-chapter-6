const { articles } = require("../models");
const utils = require("../utils");

module.exports = {
  create: async (req, res, next) => {
    try {
      const fileTostring = req.file.buffer.toString("base64");

      const uploadFile = await utils.imageKit.upload({
        fileName: req.file.originalname,
        file: fileTostring,
      });

      const data = await articles.create({
        data: {
          title: req.body.title,
          slug: req.body.title.replace(/\s+/g, "-"),
          image: uploadFile.url,
          description: req.body.description,
          categoryId: parseInt(req.body.category_id),
        },
      });

      return res.status(201).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const fileTostring = req.file.buffer.toString("base64");

      const uploadFile = await utils.imageKit.upload({
        fileName: req.file.originalname,
        file: fileTostring,
      });

      const data = await articles.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          title: req.body.title,
          slug: req.body.title.replace(/\s+/g, "-"),
          image: uploadFile.url,
          description: req.body.description,
          categoryId: parseInt(req.body.category_id),
        },
      });

      return res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const data = await articles.findUnique({
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
  destroy: async (req, res, next) => {
    try {
      const data = await articles.delete({
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
