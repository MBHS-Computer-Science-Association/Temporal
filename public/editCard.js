function editCard(edit, res){
  edit = true;
  res.render('graph', {
    edit: edit,
    resp: res
  });
}
