const r = new Ractive({
    el: 'body',
    template: '#template',
    data:{
        formatDate:function(dateNum){
            return (new Date(dateNum)).toUTCString();
        }
    },
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