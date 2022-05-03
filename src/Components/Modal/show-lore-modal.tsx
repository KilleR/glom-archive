import Modal from "./modal";
import styled from "@emotion/styled";
import {libraryPost} from "../../API";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`


const ShowLoreModal = ({visible, data, close}: { visible: boolean, data: libraryPost, close: () => void }) => {

  return (
    <Modal visible={visible}>
      <Form>
        <h3>
         {data.title}
        </h3>
        <div style={{display: 'flex', flex: '1 1 auto', flexDirection: 'row', padding: '5px'}}>
          <label style={{
            width: '50px',
            textTransform: 'capitalize',
            flex: '1 1 auto',
            textAlign: 'right',
            paddingRight: '10px'
          }} htmlFor={'title'}>{'title'} : </label>
          <input style={{flex: '3 3 auto', textTransform: 'capitalize',}} name={'title'} type={'text'} value={data.title.replace('-', ' ')} readOnly />
        </div>
        <div style={{display: 'flex', flex: '1 1 auto', flexDirection: 'row', padding: '5px'}}>
          <label style={{
            width: '50px',
            textTransform: 'capitalize',
            flex: '1 1 auto',
            textAlign: 'right',
            paddingRight: '10px'
          }} htmlFor={'tags'}>{'tags'} : </label>
          <input style={{flex: '3 3 auto'}} name={'tags'} type={'text'} value={data.metadata.tags.join(', ')} readOnly />
        </div>
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
          <textarea style={{flex: '1 1 auto'}} rows={6} name={'content'} value={data.content} readOnly />
        </div>
        <input type={'button'} onClick={close} value={'Close'} />
      </Form>
    </Modal>
  )
}

export default ShowLoreModal;
