import Tree from 'react-d3-tree';
import gscData from './data/gsc.json';

const renderNode = ({ nodeDatum, toggleNode }) => {
  console.log(nodeDatum);
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
  return (
    <div
      style={{ border: '1px solid black', height: 750, margin: 30, width: 750 }}
    >
      <Tree
        data={gscData}
        collapsible={true}
        initialDepth={2}
        renderCustomNodeElement={renderNode}
        translate={{ x: 50, y: 375 }}
        zoom={0.2}
      />
    </div>
  );
}

export default App;
