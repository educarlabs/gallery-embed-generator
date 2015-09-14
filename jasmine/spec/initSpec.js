/**
 * Tests para el momento de inicialización del generador.
 */
describe("Al intentar inicializar el generador de códigos de embebido", function() {

    var $form,
        $textarea,
        defaultEmbedCode = '<iframe frameborder="0"  allowfullscreen src="http://cdn.educ.ar/galeria/?id=12345" width="320" height="180"></iframe>';


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form     = $('[data-galleryembedgenerator]');
        $textarea = $('[data-galleryembedgenerator-target]');
    });


    it("debe inicializarse correctamente si se usa el marcado por defecto", function() {

        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();

        GalleryEmbedGenerator.init();

        expect($textarea).not.toHaveValue('');
        expect($textarea).toHaveValue(defaultEmbedCode);
        expect($textarea).not.toBeDisabled();

    });


    it("debe inicializarse correctamente si se usa marcado personalizado y se configura de forma acorde", function() {

        $form.removeAttr('data-galleryembedgenerator').attr('id', 'my-generator');
        $textarea.removeAttr('data-galleryembedgenerator-target').attr('name', 'my-embeddercode');

        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();

        GalleryEmbedGenerator.init({
            formSelector  : '#my-generator',
            targetSelector: '[name="my-embeddercode"]'
        });

        expect($textarea).toHaveValue(defaultEmbedCode);
        expect($textarea).not.toBeDisabled();

    });


    it("no debe inicializarse si el marcado es incorrecto o la configuración es errónea", function() {

        $form.removeAttr('data-galleryembedgenerator');
        $textarea.removeAttr('data-galleryembedgenerator-target');

        GalleryEmbedGenerator.init();
        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();

        GalleryEmbedGenerator.init({
            formSelector  : '#my-generator',
            targetSelector: '[name="my-embeddercode"]'
        });

        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();

    });


    it("no debe inicializarse si al formulario le faltan campos requeridos", function() {
        /**
         * Por cada elemento de un array busco en el formulario un campo con ese 'name',
         * lo quito del DOM, intento inicializar el generador y compruebo que falle.
         * Luego vuelvo a insertar el elemento en el formulario, intento inicializar
         * el generador y compruebo que no falle.
         */
        var $el,
            checkFields = ['rec_id', 'baseurl', 'width', 'height', 'autoplay', 'time', 'skin'];

        $.each(checkFields, function(index, value){
            $el = $('[name="' + value + '"]').remove();

            expect($el.length).not.toBe(0);

            GalleryEmbedGenerator.init();

            expect($textarea).toHaveValue('');
            expect($textarea).toBeDisabled();

            $el.appendTo($form);

            GalleryEmbedGenerator.init();

            expect($textarea).toHaveValue(defaultEmbedCode);
            expect($textarea).not.toBeDisabled();

            GalleryEmbedGenerator.kill();
        });

    });


    it("se deben activar todos los campos que estaban desactivados", function() {

        var fields = ['rec_id', 'baseurl', 'width', 'height', 'autoplay', 'time', 'skin'];

        $.each(fields, function(index, value){
            expect($('[name="' + value + '"]')).toBeDisabled();
        });

        GalleryEmbedGenerator.init();

        $.each(fields, function(index, value){
            expect($('[name="' + value + '"]')).not.toBeDisabled();
        });

    });

});
