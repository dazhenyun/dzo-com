import { Select, Input, Divider } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less';
import { cloneDeep } from 'lodash';

export default props => {
  const {
    options,
    fieldNames = ['label', 'value'],
    onEdit,
    onAdd,
    onDelete,
    showAdd,
    showEdit,
    render,
    ...otehr
  } = props;
  const inputRef = useRef(null);
  const [editKey, setEditKey] = useState({});
  const [name, setName] = useState('');
  const [label, value] = fieldNames;

  const optionData = useMemo(() => {
    if (!options?.length) {
      return [];
    }
    return options.map(el => ({ ...el, label: el[label], value: el[value] }));
  }, [options]);

  const editLbel = (e, value, label) => {
    e.stopPropagation();
    setEditKey({
      ...editKey,
      [value]: label,
    });
  };

  const focus = e => {
    e.stopPropagation();
  };

  const mouseDown = e => {
    e.target.focus();
  };

  const inputChange = (e, value) => {
    setEditKey({
      ...editKey,
      [value]: e.target.value,
    });
  };

  const onSure = (e, val) => {
    e.stopPropagation();
    let isChange = true;
    const items = cloneDeep(options);
    items.forEach(item => {
      if (item[value] === val) {
        if (item[label] === editKey[val]) {
          isChange = false;
        }
        item[label] = editKey[val];
      }
    });
    const item = { [label]: editKey[val], [value]: val };
    if (isChange && onEdit) {
      setEditKey({
        ...editKey,
        [val]: null,
      });
      onEdit(item, items);
    } else {
      setEditKey({
        ...editKey,
        [val]: null,
      });
    }
  };

  const onSelect = () => {
    setEditKey({});
  };

  const addItem = e => {
    e.stopPropagation();
    if (!name) {
      return;
    }
    const item = { [label]: name };
    const items = cloneDeep(options);
    items.push(item);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    if (onAdd) {
      onAdd(item, items);
    }
  };

  const onNameChange = event => {
    setName(event.target.value);
  };

  const deletItem = (e, val) => {
    e.stopPropagation();
    const item = options.filter(el => el[value] === val)[0];
    const items = options.filter(el => el[value] !== val);
    if (onDelete) {
      onDelete(item, items);
    }
  };

  return (
    <>
      <Select
        className="selectNode"
        {...otehr}
        optionLabelProp="label"
        onSelect={onSelect}
        dropdownRender={
          showAdd
            ? menu => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <div
                    className="selectContent"
                    style={{ padding: '0px 12px' }}
                  >
                    <Input
                      placeholder="请输入"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={e => e.stopPropagation()}
                    />
                    <PlusOutlined className="clickA" onClick={addItem} />
                  </div>
                </>
              )
            : false
        }
      >
        {optionData.map(el => {
          return (
            <Option label={el?.label} key={el?.value} value={el?.value}>
              {showEdit ? (
                <div className="selectContent">
                  {editKey[el.value] ? (
                    <Input
                      onChange={e => inputChange(e, el.value)}
                      onMouseDown={mouseDown}
                      value={editKey[el.value]}
                      onClick={focus}
                    />
                  ) : (
                    <span className="labelBox">{el.label}</span>
                  )}
                  {editKey[el.value] ? (
                    <a
                      className="clickA"
                      onClick={e => onSure(e, el.value)}
                      type="link"
                    >
                      {editKey[el.value] ? '确定' : '编辑'}
                    </a>
                  ) : (
                    <>
                      <EditOutlined
                        className="clickA"
                        onClick={e => editLbel(e, el.value, el.label)}
                      />
                      <DeleteOutlined
                        style={{ marginLeft: '5px' }}
                        onClick={e => deletItem(e, el.value)}
                        className="clickA"
                      />
                    </>
                  )}
                </div>
              ) : (
                el.label
              )}
            </Option>
          );
        })}
      </Select>
    </>
  );
};
