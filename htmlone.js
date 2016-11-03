const fs = require('fs');
const path = require('path');
const options = getCLIOptions();

let file = {
	defaultEncoding: 'utf-8',
	read: function(filepath, options) {
		var contents;
		contents = fs.readFileSync(String(filepath),{encoding: 'utf-8'});
		return contents;
	},
	write: function (filepath, contents, options) {
		this.mkdir(path.dirname(filepath));
		fs.writeFileSync(filepath, contents, options);
		return true;
	},
	mkdir: function (dirpath, mode) {
		mode = mode || parseInt('0777', 8) & (~process.umask());
	
		dirpath.split(path.sep).reduce((parts, part) => {
			parts += part + '/';
			var subpath = path.resolve(parts);
			!this.exists(subpath) && fs.mkdirSync(subpath, mode);
			return parts;
		}, '')
	},
	exists: function (...args) {
		return fs.existsSync( path.join.apply(path, args) )
	}
}

//The final key statements
let output_contents = combo(options.input);
if( options.output ){
	file.write(options.output, output_contents);
} else {
	process.stdout.write( output_contents );
}

function combo(filepath) {
	var linkPattern = /<link\s([^>]+)>/g;
	var scriptPattern = /<script\s([^>]+)>/g;

	var html = file.read(filepath);

	html = html.replace(linkPattern, function (content) {
		var href = getAttribute(content, 'href');
		var ignore = getAttribute(content, 'ignore');

		if (href.match(/\/\//) || isTruthy(ignore)) {
			return content;
		}
		return '<style>\n' + file.read(path.join(filepath, '../', href)) + '\n</style>';
	});

	html = html.replace(scriptPattern, function (content) {
		var src = getAttribute(content, 'src');
		var ignore = getAttribute(content, 'ignore');

		if (src.match(/\/\//) || isTruthy(ignore)) {
			return content;
		}
		return '<script>\n' + file.read(path.join(filepath, '../', src)) + '\n';
	});

	return html
}

function isTruthy(str) {
	return str !== 'false' && str !== undefined
}

function getAttribute(content, name) {
	var attrs = content.match(/(?!\s)[^<>\s]+/g) || [];
	for (var i = 0; i < attrs.length; i++) {
		var attr = attrs[i];
		var pairs = attr.split('=', 2);
		if (pairs.length === 1) {
			pairs[1] = '';
		}
		if (pairs[0] === name) {
			// remove "..." or '...'
			return pairs[1].replace(/('|").+\1/, function (str) {
				return str.substring(1, str.length - 1);
			});
		}
	}
}

function getCLIOptions(){
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

	if( output_filename ) {
		output = path.resolve(output_filename);
	}

    return {
        input: input,
        output: output
    }
}