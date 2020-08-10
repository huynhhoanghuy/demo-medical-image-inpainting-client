import React from "react";
import ImageUploader from 'react-images-upload';

class InputFile extends React.Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.state = { pictures: [], onChange: props.onChange };
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        this.state.onChange(picture);
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.bmp', '.jpeg']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
            />
        );
    }
}

export default InputFile;