const r = new Ractive({
    el: 'body',
    template: '#template',
    computed: {
        
    }
});

fetch('./out.json')
    .then(d => d.json())
    .then((data) => {
        r.set('data',
            data
        );
    });