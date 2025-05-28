import React, { useRef, useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const EditorScreen = () => {
    const richText = useRef();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    // Function to upload image to Node.js server
    const uploadImageToServer = async (uri) => {
        const formData = new FormData();
        const filename = uri.split('/').pop();
        const fileType = uri.split('.').pop();

        // Prepare image file data for upload
        formData.append('file', {
            uri,
            type: `image/${fileType}`,
            name: filename,
        });

        try {
            console.log('Uploading image to server...');
            const response = await axios.post('http://192.168.168.146:9090/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully:', response.data);
            return response.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    // Handle image selection for both main content image and thumbnail
    const handleImageSelection = async (isThumbnail = false) => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                console.log('Selected image URI:', uri);

                const imageUrl = await uploadImageToServer(uri);

                if (imageUrl) {
                    if (isThumbnail) {
                        setThumbnail(imageUrl);
                        console.log('Thumbnail URL:', imageUrl);
                    } else {
                        console.log(imageUrl)
                        richText.current.insertImage(imageUrl);
                    }
                }
            }
        });
    };

    // Handle saving the article (title, description, thumbnail, and content)
    const handleSaveArticle = async () => {
        if (!title || !description || !thumbnail) {
            Alert.alert('Missing Fields', 'Please fill in all fields before submitting.');
            return;
        }
        
        const content = await richText.current.getContentHtml();

        const articleData = {
            title: title,
            description: description,
            thumbnail: thumbnail,
            content: content,
        };

        try {
            const response = await axios.post('http://192.168.168.146:9090/save-article', articleData);
            console.log('Article saved successfully:', response.data);
            Alert.alert('Success', 'Article published successfully!');
        } catch (error) {
            console.error('Error saving article:', error);
            Alert.alert('Error', 'Failed to publish article. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
        <ScrollView 
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Create New Article</Text>
            </View>

            {/* Title Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Article Title</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter a compelling title..."
                    placeholderTextColor="#999"
                    style={styles.titleInput}
                />
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Short Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter a brief description (max 160 characters)..."
                    placeholderTextColor="#999"
                    style={styles.descriptionInput}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={160}
                />
                <Text style={styles.charCount}>
                    {description.length}/160 characters
                </Text>
            </View>

            {/* Thumbnail Section */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Thumbnail Image</Text>
                <TouchableOpacity 
                    onPress={() => handleImageSelection(true)} 
                    style={styles.thumbnailButton}
                >
                    <Icon name="image-outline" size={24} color="white" />
                    <Text style={styles.buttonText}>Select Thumbnail</Text>
                </TouchableOpacity>

                {thumbnail && (
                    <View style={styles.thumbnailContainer}>
                        <Image 
                            source={{ uri: thumbnail }} 
                            style={styles.thumbnail} 
                            resizeMode="cover"
                        />
                        <TouchableOpacity 
                            style={styles.changeThumbnailButton}
                            onPress={() => handleImageSelection(true)}
                        >
                            <Icon name="swap-horizontal-outline" size={16} color="#FF4500" />
                            <Text style={styles.changeThumbnailText}>Change Thumbnail</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Editor Section */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Article Content</Text>
                <View style={styles.editorContainer}>
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink,
                            actions.insertImage,
                            actions.undo,
                            actions.redo,
                        ]}
                        iconTint="#333"
                        selectedIconTint="#FF4500"
                        onPressAddImage={() => handleImageSelection(false)}
                        style={styles.richToolbar}
                    />
                    <RichEditor
                        ref={richText}
                        placeholder="Write your amazing content here..."
                        initialHeight={300}
                        style={styles.richEditor}
                        editorStyle={styles.editorStyle}
                    />
                </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity 
                onPress={handleSaveArticle} 
                style={styles.saveButton}
                activeOpacity={0.8}
            >
                <Icon name="send-outline" size={20} color="white" style={styles.saveIcon} />
                <Text style={styles.saveButtonText}>Publish Article</Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: '#f8f9fa',
        paddingBottom: 40,
    },
    header: {
        marginBottom: 25,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    inputContainer: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
    },
    titleInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    descriptionInput: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        textAlignVertical: 'top',
    },
    charCount: {
        textAlign: 'right',
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    thumbnailButton: {
        backgroundColor: '#FF4500',
        paddingVertical: 14,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    thumbnailContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    thumbnail: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    changeThumbnailButton: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    changeThumbnailText: {
        color: '#FF4500',
        fontWeight: '600',
        fontSize: 14,
    },
    editorContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    richToolbar: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    richEditor: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        color: '#333',
        minHeight: 300,
    },
    editorStyle: {
        backgroundColor: '#fff',
        placeholderColor: '#999',
        initialCSSText: `
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 16px; 
                line-height: 1.6; 
                color: #333; 
                padding: 10px;
            }
            h1, h2, h3 { 
                margin-top: 20px; 
                margin-bottom: 10px; 
            }
            p { 
                margin-bottom: 15px; 
            }
        `,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 10,
    },
    saveIcon: {
        marginRight: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default EditorScreen;