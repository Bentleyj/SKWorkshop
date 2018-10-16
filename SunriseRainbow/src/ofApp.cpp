#include "ofApp.h"

bool compareString(string a, string b) {
    vector<string> splitA = ofSplitString(a, "/");
    vector<string> splitB = ofSplitString(b, "/");
    a = splitA[splitA.size()-1];
    b = splitB[splitB.size()-1];
    splitA = ofSplitString(a, ".");
    splitB = ofSplitString(b, ".");
    a = splitA[0];
    b = splitB[0];
    splitA = ofSplitString(a, "-");
    splitB = ofSplitString(b, "-");
    float yA = ofToInt(splitA[0]);
    float mA = ofToInt(splitA[1]);
    float dA = ofToInt(splitA[2]);
    float fA = ofToInt(splitA[3]);
    float yB = ofToInt(splitB[0]);
    float mB = ofToInt(splitB[1]);
    float dB = ofToInt(splitB[2]);
    float fB = ofToInt(splitB[3]);
    
    if(yA == yB) {
        if(mA == mB) {
            if(dA == dB) {
                return fA < fB;
            }
            return dA < dB;
        }
        return mA < mB;
    }
    return yA < yB;
}

//--------------------------------------------------------------
void ofApp::setup(){    
    ofxNestedFileLoader loader;
    imagePaths = loader.load("images/SKWorkshopImages");

    std::sort(imagePaths.begin(), imagePaths.end(), compareString);
    
    img.load(imagePaths[0]);
    
    cols = f.getColorsFromImage(img);
    
    string settingsPath = "settings/settings.xml";
    gui.setup("Settings", settingsPath);

    ofBackground(0);
    
    showGui = false;
    
    buffer.allocate(ofGetWidth(), ofGetHeight());
}

//--------------------------------------------------------------
void ofApp::update(){
    imageIndex++;
    imageIndex %= imagePaths.size();
    img.load(imagePaths[imageIndex]);
    
    cols = f.getColorsFromImage(img);
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofSetColor(255);
    float scale = ofGetWidth() / img.getWidth();
    float height = 600 * scale;
    img.draw(0, 0, ofGetWidth(), height);

    if(showGui) {
        gui.draw();
    }
    
    buffer.begin();
    if(imageIndex%120 == 0) {
        ofClear(0);
        colorPos.x = 0;
    }
    for(int i = 0; i < cols.size(); i++) {
        ofSetColor(cols[i]);
        ofDrawRectangle(colorPos.x, colorPos.y, ofGetWidth() / 120, 10);
        colorPos.y += 10;
    }

    colorPos.y = 0;
    colorPos.x += ofGetWidth() / 120;
    buffer.end();
    
    buffer.draw(0, height);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == 'g') {
        showGui = !showGui;
    }
    if(key == ' ') {

    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
