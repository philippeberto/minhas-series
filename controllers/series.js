const labels = [
  { id: "to-watch", name: "Ver Mais Tarde" },
  { id: "watching", name: "A Ver" },
  { id: "watched", name: "Visto" },
];

const index = async ({ Serie }, req, res) => {
  const docs = await Serie.find({});
  res.render("series/index", { series: docs, labels });
};

const novaProcess = async ({ Serie }, req, res) => {
  const serie = new Serie(req.body);
  try {
    await serie.save();
    res.redirect("/series");
  } catch (err) {
    res.redirect("/series/nova", {
      error: Object.keys(err.errors),
    });
  }
};

const novaForm = (req, res) => {
  res.render("series/nova");
};

const excluir = async ({ Serie }, req, res) => {
  await Serie.deleteOne({ _id: req.params.id });
  res.redirect("/series");
};

const updateProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  serie.name = req.body.name;
  serie.status = req.body.status;
  await serie.save();
  res.redirect("/series");
};

const updateForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  res.render("series/update", { serie, labels });
};

const info = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  res.render("series/info", { serie });
};

const addComment = async ({ Serie }, req, res) => {
  await Serie.updateOne(
    { _id: req.params.id },
    { $push: { comments: req.body.comentario } }
  );
  res.redirect("/series/info/" + req.params.id);
};

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  updateForm,
  updateProcess,
  info,
  addComment,
};
