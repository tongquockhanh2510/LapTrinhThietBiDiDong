import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ id, title, done, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    // khi title thay đổi từ parent (ví dụ cập nhật), đồng bộ text
    setText(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = (text || '').trim();
    if (!trimmed) {
      // nếu muốn, có thể show alert; hiện tại không lưu tên rỗng
      setText(title); // phục hồi
      setIsEditing(false);
      return;
    }
    if (trimmed !== title) {
      onUpdate && onUpdate(id, trimmed);
    }
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleCancel = () => {
    setText(title);
    setIsEditing(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.left} onPress={onToggle} activeOpacity={0.7}>
        <View style={[styles.checkBox, done && styles.checked]}>
          {done ? <Ionicons name="checkmark" size={16} color="#18c7d8" /> : null}
        </View>

        {isEditing ? (
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={setText}
            style={[styles.inputEditable]}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            blurOnSubmit={false}
          />
        ) : (
          <Text style={[styles.title, done && { textDecorationLine: 'line-through', color: '#9aa0a6' }]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.rightActions}>
        {isEditing ? (
          <>
            <TouchableOpacity onPress={handleSave} style={styles.actionBtn}>
              <Ionicons name="checkmark" size={20} color="#18c7d8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.actionBtn}>
              <Ionicons name="close" size={20} color="#ff6b6b" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.actionBtn}>
            <Ionicons name="pencil" size={18} color="#ff6b6b" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    elevation: 2,
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cfd8dc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checked: { backgroundColor: '#ecfffd', borderColor: '#18c7d8' },
  title: { fontSize: 15, flexShrink: 1 },
  edit: { paddingHorizontal: 8 },
  rightActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  inputEditable: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: 'transparent',
  },
});