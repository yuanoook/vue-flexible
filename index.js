const path = require('path');

getInputOutput();

function getInputOutput(){
    if(!process.argv[2]){
        throw new Error('No input file detected!');
    }
    let input = path.resolve(process.argv[2]);
    let input_filename = path.basename(input);
    let output;
    let output_filename;
    process.argv.forEach((arg, index, argv) => {
        if( /^\-(o|\-output)$/.test(argv[index-1]) ){
            output_filename = arg;
        }
    })
    output_filename = output_filename ? output_filename : input_filename.replace(/([^\.]*)$/,"min.$1")
    output = path.resolve(output_filename);

    console.log({
        input: input,
        input_filename: input_filename,
        output: output,
        output_filename
    });
}
