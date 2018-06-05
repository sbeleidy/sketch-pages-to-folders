@import './utilities.js';

function exportAllPages(context) {

	var sketch = context.api();
	var application = sketch.Application();
	var doc = context.document;
	var pages = doc.pages();
	var fileFolder = doc.fileURL().path().split(doc.displayName())[0];
	
	var rootFolder = fileFolder + "designs/";
	
	try {
		Utilities.deleteAndCreateFolder(rootFolder);
		
		var pageCounter = 1;
		
		for (var i = 0; i < pages.count(); i++) {
			var currentPage = pages[i];
			
			if (currentPage.name() != "Symbols" && !currentPage.name().startsWith("-") ) {
				var pageFolderPath = rootFolder + pageCounter.toString() + "\u2013" + Utilities.camelize(pages[i].name()) + "/";
				Utilities.createFolder(pageFolderPath);
				
				doc.setCurrentPage(currentPage);
				
				var artboards = doc.currentPage().artboards();
				
				for (var j = 0; j < artboards.count(); j++) {
					var artboard = artboards[j];
					var artboardNameWithDashesInsteadOfSlashes = Utilities.camelize(Utilities.cleanArtboardName(String(artboard.name())));
					
					// TODO Try and get the exportable options for each artboard,
					// and export it that way. If there are no export options,
					// export the file as a @1x .png file.
					doc.saveArtboardOrSlice_toFile_(artboard, pageFolderPath + artboardNameWithDashesInsteadOfSlashes + ".png");
				}
				
				pageCounter = pageCounter + 1;
			}
		}
		application.alert("You can find the exported files in a folder next to your original file.", "Export Successful!");
	}
	catch(error) {
		application.alert("An error occurred.", error.toString())
		// expected output: SyntaxError: unterminated string literal
		// Note - error messages will vary depending on browser
	}
};
	