import CMS from 'netlify-cms';

const createVimeoLink = (link) => {
    const videoIdPattern = /\.com\/(?<id>.*)$/u;
    const [, videoId] = videoIdPattern.exec(link);

    return `<div class="bpbc-iframe-container"><iframe src="https://player.vimeo.com/video/${videoId}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen class="bpbc-iframe"></iframe></div>`;
};


CMS.registerEditorComponent({
    // Internal id of the component
    id: 'vimeo',
    // Visible label
    label: 'Vimeo',
    // Fields the user need to fill out when adding an instance of the component
    fields: [{ name: 'id',
        label: 'Vimeo video url',
        widget: 'string' }],
    // Pattern to identify a block as being an instance of this component
    pattern: /^vimeo (?<link>\S+)$/u,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) { // eslint-disable-line func-names
        return {
            id: match[1]
        };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) { // eslint-disable-line func-names
        return createVimeoLink(obj.id);
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) { // eslint-disable-line func-names
        return createVimeoLink(obj.id);
    }
});
