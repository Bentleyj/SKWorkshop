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

bool compareColorVariety(colorDay* a, colorDay* b) {
    int maxA = 0;
    int maxB = 0;
    for(int i = 0; i < a->cols.size(); i++) {
        if(a->cols[i].size() > maxA) {
            maxA = a->cols[i].size();
        }
    }
    for(int i = 0; i < b->cols.size(); i++) {
        if(b->cols[i].size() > maxB) {
            maxB = b->cols[i].size();
        }
    }
    return maxA < maxB;
}

bool compareAverageHue(colorDay* a, colorDay* b) {
    return a->averageColor.getHue() < b->averageColor.getHue();
}

//--------------------------------------------------------------
void ofApp::setup(){    
    ofxNestedFileLoader loader;
    imagePaths = loader.load("images/SKWorkshopImages");

    sort(imagePaths.begin(), imagePaths.end(), compareString);
    
    img.load(imagePaths[0]);
    vector<ofColor> cols;
    cols = f.getColorsFromImage(img);
    colorDay* d = new colorDay();
    currentDay = d;
    d->cols.push_back(cols);
    d->imgPaths.push_back(imagePaths[imageIndex]);
    colorDays.push_back(d);
    
    string settingsPath = "settings/settings.xml";
    gui.setup("Settings", settingsPath);

    ofBackground(0);
    
    showGui = false;
    
    box.set(10);
    box.setPosition(112, 138, -192);
    cam.lookAt(ofVec3f(0, -0.3, 1));
    
    buffer.allocate(ofGetWidth(), ofGetHeight());
    
    ofSetLineWidth(1);
    
    glPointSize(2);
    
    glEnable(GL_POINT_SPRITE);
    
    ofEnableAntiAliasing();
    
    ofEnableDepthTest();
}

//--------------------------------------------------------------
void ofApp::update(){
    if(playing) {
        imageIndex++;
        if(imageIndex > imagePaths.size() - 1) {
            playing  = false;
            return;
        }
        imageIndex %= imagePaths.size();
        img.load(imagePaths[imageIndex]);
        vector<ofColor> cols;
        cols = f.getColorsFromImage(img);
        
        if(imageIndex % 120 == 0) {
            // New day!
            colorDay* d = new colorDay();
            d->addCols(cols);
            d->addImage(imagePaths[imageIndex], 0.25);
            currentDay = d;
            colorDays.push_back(d);
            sort(colorDays.begin(), colorDays.end(), compareAverageHue);
        } else {
            currentDay->addCols(cols);
            currentDay->addImage(imagePaths[imageIndex], 0.25);
        }
    }
    for(int i = 0; i < colorDays.size(); i++) {
        colorDays[i]->update();
    }
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
    ofClear(0);
    cam.begin();
    float z = 0;
    for(int i = 0; i < colorDays.size(); i++) {
        colorDays[i]->draw(0, 0, z);
        z += 50;
    }
    cam.end();
    buffer.end();
    
    buffer.draw(0, height);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == 'g') {
        showGui = !showGui;
    }
    if(key == ' ') {
        playing = !playing;
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
