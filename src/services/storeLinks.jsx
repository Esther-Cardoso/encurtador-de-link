// buscar link
export async function getLinksSave(key) {
  const myLinks = await localStorage.getItem(key);

  let linksSaves = JSON.parse(myLinks) || [];
  return linksSaves;
}

// salvar link
export async function saveLink(key, newLink) {
  let linksStored = await getLinksSave(key);

  const hasLink = linksStored.some((link) => link.id === newLink.id);

  if (hasLink) {
    console.log('ESSE LINK JÁ EXISTE NA SUA LISTA');
    return;
  }

  linksStored.push(newLink);
  await localStorage.setItem(key, JSON.stringify(linksStored));
  console.log('link salvo com sucesso');
}

// deletar algum link salvo
export function deleteLink(links, id) {
  let myLinks = links.filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem('@encurtaLink', JSON.stringify(myLinks));
  console.log('link deletado com sucesso');

  return myLinks;
}
