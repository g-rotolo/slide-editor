import { components, OptionProps } from 'react-select';

const { Option } = components;

const IconOption = (props: OptionProps) => (
    <Option {...props}>
        <div className="option-container">
            {/* @ts-ignore: Must find a better solution if possible */}
            <p className="material-icons">{props.data.icon}</p>
        </div>
    </Option>
);

export default IconOption;
