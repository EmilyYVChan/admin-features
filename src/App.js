import React, { Component } from "react";
import SortableTree, {
  getFlatDataFromTree,
  getTreeFromFlatData,
  addNodeUnderParent,
  removeNodeAtPath,
  getDescendantCount,
  changeNodeAtPath
} from "react-sortable-tree";

const initialData = [
  { id: "1", name: "Exterior", parent: null },
  { id: "2", name: "Interior", parent: null },
  { id: "3", name: "Roof", parent: null },
  { id: "4", name: "Protect Work Area", parent: 2 },
  { id: "5", name: "Walls - Wet areas, bathrooms", parent: 2 },
  {
    id: "6",
    name: "Joinery - windows, doors, skirting boards, shelving",
    parent: 2
  },
  {
    id: "7",
    name:
      "2 coats of Dulux Aquanamel in semi-gloss (low odour enamel, does not yellow with age)",
    parent: 6
  },
  {
    id: "8",
    name:
      "2 coats of Dulux Aquanamel in gloss (low odour enamel, does not yellow with age)",
    parent: 6
  },
  {
    id: "9",
    name:
      "2 coats of Dulux Kitchen &amp; Bathroom (resistant to damp conditions and inhibits mould growth)",
    parent: 5
  },
  { id: "10", name: "Cover all flooring with drop sheets", parent: 4 },
  { id: "11", name: "Cover all furniture with plastic film", parent: 4 },
  {
    id: "12",
    name: "Replace door hinges with temporary hinges during painting process",
    parent: 4
  },
  {
    id: "13",
    name:
      "Remove door/window fittings/outlet covers &amp; curtain railings &amp; pull down lights (if possible)",
    parent: 4
  },
  { id: "14", name: "Joinery cedar - windows, doors", parent: 1 },
  {
    id: "15",
    name: "2 coats of hard wearing Dulux Aquanamel for high wear areas",
    parent: 14
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: getTreeFromFlatData({
        flatData: initialData.map(node => ({
          ...node,
          title: node.name,
          expanded: true
        })),
        getKey: node => node.id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key
        rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
      })
    };
  }

  saveChanges() {
    const flatData = getFlatDataFromTree({
      treeData: this.state.treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node, path }) => ({
      id: node.id,
      name: node.name,

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null
    }));

    console.log(flatData);

    //TODO: compare flatData with initialData to determine what has been changed.
    //Then call REST API to make changes in database.
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-center">
          <button className="btn btn-primary float-left">Cancel</button>
          <button
            className="btn btn-primary ml-auto"
            onClick={() => this.saveChanges()}
          >
            Save
          </button>
        </nav>
        <div style={{ height: 1000 }}>
          <button
            onClick={() =>
              this.setState(state => ({
                treeData: state.treeData.concat({
                  title: "Untitled"
                })
              }))
            }
          >
            Add new scope
          </button>
          <SortableTree
            treeData={this.state.treeData}
            maxDepth={3}
            onChange={treeData => this.setState({ treeData })}
            generateNodeProps={({ node, path }) => ({
              title: (
                <input
                  style={{ fontSize: "1.1rem" }}
                  size={50}
                  value={node.name}
                  onChange={event => {
                    const name = event.target.value;

                    this.setState(state => ({
                      treeData: changeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                        newNode: { ...node, name }
                      })
                    }));
                  }}
                />
              ),
              buttons: [
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: addNodeUnderParent({
                        treeData: state.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          title: "Untitled"
                        },
                        addAsFirstChild: state.addAsFirstChild
                      }).treeData
                    }))
                  }
                >
                  Add child
                </button>,
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey
                      })
                    }))
                  }
                >
                  Remove
                </button>
              ]
            })}
          />
        </div>
      </div>
    );
  }
}

export default App;
