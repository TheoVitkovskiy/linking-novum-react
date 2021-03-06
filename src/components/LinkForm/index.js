import React from 'react';
import { Button, Modal, Form, Input, Col, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const styles = {
    formItem: {
        marginTop: '3em'
    }
}

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new Link"
        okText="Create a Link"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
            <FormItem label="Where does the original section end?">
                <Col span={5}>
                    <FormItem label='Chapter'>
                        {getFieldDecorator('endChapterFrom')(
                            <InputNumber 
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    <FormItem label='Verse'>
                        {getFieldDecorator('endVerseFrom')(
                            <InputNumber 
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem style={styles.formItem} label="Which book contains the section you want to link to?">
                {getFieldDecorator('bookTo')(
                    <Select style={{ width: 120 }}>
                        <Option value='luke'>Luke</Option>
                        <Option value='matthew'>Matthew</Option>
                        <Option value='mark'>Mark</Option>
                        <Option value='acts'>Acts</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem label="Where does the link section start?">
                <Col span={5}>
                    <FormItem label='Chapter'>
                        {getFieldDecorator('startChapterTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    <FormItem label='Verse'>
                        {getFieldDecorator('startVerseTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem style={styles.formItem} label="Where does the link section end?">
                <Col span={5}>
                    <FormItem label='Chapter'>
                        {getFieldDecorator('endChapterTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    <FormItem label='Verse'>
                        {getFieldDecorator('endVerseTo')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem style={styles.formItem} label="Add your comment!">
                {getFieldDecorator('description')(
                    <Input
                        type='textarea'
                    />
                )}
            </FormItem>
        </Form>
      </Modal>
    );
  }
);

class CollectionsPage extends React.Component {

  handleCreateLink = () => {
    const form = this.form;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      values["bookFrom"] = this.props.currVerse.chapter.book.name;
      values["startChapterFrom"] = this.props.currVerse.chapter.number;
      values["startVerseFrom"] = this.props.currVerse.verseNumber;
    
      fetch(`${process.env.REACT_APP_API_HOST}/link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  
  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const { modal: { hide, visible } } = this.props;

    return (
      <div>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={visible}
          onCancel={hide}
          onCreate={this.handleCreateLink}
        />
      </div>
    );
  }
}

export default CollectionsPage;