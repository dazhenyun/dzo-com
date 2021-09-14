export const getDataList = (treeData, keyField, nameField, childrenField) => {
  const dataList = [];
  function generateList(data, parentNode = {}, parentIds = []) {
    data?.forEach(node => {
      const key = `${node[keyField]}`;
      const title = node[nameField];
      const currenParentIds = parentNode[keyField]
        ? [...parentIds, parentNode[keyField]]
        : undefined;
      dataList.push({ key, title, parentKeys: currenParentIds, ...node });
      if (node[childrenField]) {
        generateList(node[childrenField], node, currenParentIds);
      }
    });
  }
  generateList(treeData);
  return dataList;
};
