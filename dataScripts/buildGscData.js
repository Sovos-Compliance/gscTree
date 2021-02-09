const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');

function findTreeNode(id, node) {
  if (node.id === id) {
    return node;
  }

  if (node.children && node.children.length) {
    for (let i = 0; i < node.children.length; i++) {
      const found = findTreeNode(id, node.children[i]);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
}

async function buildTree() {
  const tree = {
    id: '0',
    name: 'Codes',
  };
  const gscData = fs
    .createReadStream(path.join(__dirname, 'GSC_E_U 11_01_20.csv'))
    .pipe(parse({ columns: true }));

  for await (const row of gscData) {
    const parent = findTreeNode(row.PARENT_ID, tree);

    if (!parent) {
      console.log(row);
      continue;
    }

    if (!parent.children) {
      parent.children = [];
    }

    parent.children.push({
      id: row.ID,
      name: row.GS_CODE,
      description: row.DESCRIPTION,
      attributes: {
        Description: row.DESCRIPTION,
      },
    });
  }

  return tree;
}

async function writeGscData() {
  const data = await buildTree();
  fs.writeFileSync(
    path.resolve(__dirname, '../src/data/gsc.json'),
    JSON.stringify(data)
  );
}

(async () => await writeGscData())();
