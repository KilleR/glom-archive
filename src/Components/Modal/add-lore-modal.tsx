import Modal from "./modal";
import {ChangeEvent, FormEvent, useState} from "react";
import styled from "@emotion/styled";
import {formInputs} from "../../config";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

const inputElements = ['title', 'tags']

const AddLoreModal = ({visible, onSubmit}: { visible: boolean, onSubmit: (data: formInputs) => void }) => {
  const [inputs, setInputs] = useState<formInputs>({content: "", tags: "", title: ""});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(inputs);
  }

  return (
    <Modal visible={visible}>
      <Form onSubmit={handleSubmit}>
        <h3>
          Add Lore
        </h3>
        {inputElements.map(formInput => (
          <div style={{display: 'flex', flex: '1 1 auto', flexDirection: 'row', padding: '5px'}} key={formInput}>
            <label style={{
              width: '50px',
              textTransform: 'capitalize',
              flex: '1 1 auto',
              textAlign: 'right',
              paddingRight: '10px'
            }} htmlFor={formInput}>{formInput} : </label>
            <input style={{flex: '3 3 auto'}} name={formInput} type={'text'} onChange={handleChange}/>
          </div>
        ))}
        <div style={{display: 'flex', flex: '1 1 auto', flexDirection: 'row', padding: '5px'}}>
          <label style={{
            width: '50px',
            textTransform: 'capitalize',
            flex: '1 1 auto',
            textAlign: 'left',
            paddingRight: '10px'
          }} htmlFor={'content'}>content : </label>
        </div>
        <div style={{display: 'flex', flex: '3 1 auto', flexDirection: 'row', padding: '5px'}}>
          <textarea style={{flex: '1 1 auto'}} rows={6} name={'content'} onChange={handleChange}/>
        </div>
        <input type={'submit'}/>
      </Form>
    </Modal>
  )
}

export default AddLoreModal;
