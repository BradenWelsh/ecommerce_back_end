const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: {model: Product,},
  }).then((data) => res.json(data))
    .catch((err) => {console.log(err); res.status(500).json(err);
  });});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: { id: req.params.id, },
    include: { model: Product,},
  })
  .then((data) => res.json(data))
  .catch((err) => {console.log(err); res.status(500).json(err);
})});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((data) => res.json(data))
  .catch((err) => {console.log(err); res.status(500).json(err);
});});

router.put("/:id", (req, res) => {
  // update a tag"s name by its `id` value
  Tag.update({
    tag_name: req.params.tag_name,
  },{where: {
    id: req.params.id, },
  }) .then((data) => {
    if (!data){res.status(404).json({message: "No tag found by this ID"});
  return;
  }res.json(data);})
  .catch((err) => {console.log(err); res.status(500).json(err);
  });});


router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{ id: req.params.id,},
  }) .then((data) => {
    if (!data){res.status(404).json({message: "No tag found by this ID"});
  return;
} res.json(data);})
.catch((err) => {console.log(err); res.status(500).json(err);
});});

module.exports = router;
