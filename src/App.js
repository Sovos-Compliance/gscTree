import { useState } from 'react';
import Tree from 'react-d3-tree';
import { filterDeep } from 'deepdash-es/standalone';
import gscData from './data/gsc.json';

const renderNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g title={nodeDatum.attributes && nodeDatum.attributes.Description}>
      <circle
        r={15}
        fill={nodeDatum.children ? '666' : '  white'}
        onClick={nodeDatum.children ? toggleNode : undefined}
      />
      <foreignObject height={50} width={100} y={20}>
        <div
          style={{ fontSize: '.67em', fontWeight: 'bold' }}
          title={nodeDatum.attributes && nodeDatum.attributes.Description}
        >
          {nodeDatum.name}
        </div>
      </foreignObject>
    </g>
  );
};

function App() {
  const [filtered, setFiltered] = useState(gscData);
  const [filterVal, setFilterVal] = useState('');

  const filterData = (e) => {
    const targetVal = e.target.value;
    const filtered = filterDeep(
      gscData,
      (value) => {
        if (
          (value.name && value.name.includes(targetVal)) ||
          (value.description && value.description.includes(targetVal))
        ) {
          return true;
        }

        if (value.children && value.children.length) {
          return undefined;
        }

        return false;
      },
      { childrenPath: 'children' }
    );
    setFilterVal(targetVal);
    setFiltered(filtered);
  };

  const clear = () => {
    setFilterVal('');
    setFiltered(gscData);
  };
  return (
    <div style={{ margin: 20 }}>
      Filter: <input type="text" onChange={filterData} value={filterVal} />
      &nbsp;
      <button onClick={clear}>Clear</button>
      <div
        style={{
          border: '1px solid black',
          height: 750,
          margin: 30,
          width: 750,
        }}
      >
        <Tree
          data={filtered}
          collapsible={true}
          initialDepth={2}
          renderCustomNodeElement={renderNode}
          translate={{ x: 50, y: 375 }}
          zoom={0.2}
        />
      </div>
    </div>
  );
}

export default App;
