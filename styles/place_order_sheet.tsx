import { StyleSheet } from 'react-native';
import Colors from "./colors";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.BLACK,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    height: '60%',
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
    paddingBottom: 15,
    marginBottom: 15,
  },
  sheetTitle: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: Colors.LIGHT_GRAY,
    marginBottom: 6,
    fontSize: 14,
  },
  detailsContainer: {
    marginVertical: 15,
    backgroundColor: Colors.DARK_DARK_GREEN,
    borderRadius: 8,
    padding: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: Colors.LIGHT_GRAY,
  },
  detailValue: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  confirmButton: {
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 15,
  },
  confirmButtonText: {
    color: Colors.BLACK,
    fontWeight: 600,
    fontSize: 16,
    position: 'absolute',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

export default styles;