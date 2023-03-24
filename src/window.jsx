import ForgeUI, { ModalDialog } from '@forge/ui';
export const TestModal  = () => {
    const [isOpen, setOpen] = useState(false);
    const [size, setSize] = useState("medium");
    return (
      <Fragment>
        <Button
          text={`Your size is ${size}. Click to change.`}
          onClick={() => setOpen(true)}
        />
        {isOpen && (
          <ModalDialog header="My modal dialog" onClose={() => setOpen(false)}>
            <Form
              onSubmit={data => {
                setSize(data.size);
                setOpen(false);
              }}
            >
              <Select label="T-shirt size" name="size">
                <Option label="Small" value="small" />
                <Option label="Medium" value="medium" />
                <Option label="Large" value="large" />
              </Select>
            </Form>
          </ModalDialog>
        )}
      </Fragment>
    );
  };