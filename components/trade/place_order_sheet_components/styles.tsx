import { StyleSheet } from 'react-native';
import Colors from "../../../styles/colors";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#FFFFFF40',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12
},
  sheet: {
    backgroundColor: Colors.BG_1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    // paddingBottom: 60,
    paddingTop: 10,
    height: '75%',
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.FG_2,
    paddingBottom: 15,
    marginBottom: 15,
  },
  sheetTitle: {
    color: Colors.FG_1,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 6,
  },
  bottomSection: {
    marginBottom: 10,
  },
  
  label: {
    color: Colors.FG_3,
    marginBottom: 4,
    fontSize: 12,
  },
  marginLabel: {
    color: Colors.FG_1,
    fontSize: 12,
  },
  detailsContainer: {
    marginVertical: 15,
    backgroundColor: Colors.BG_3,
    borderRadius: 5,
    padding: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: Colors.FG_3,
  },
  detailValue: {
    color: Colors.FG_1,
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
    color: Colors.BG_1,
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
  marginTypeSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  
  tpslContainer: {
    marginBottom: 10,
  },
  
  tpslRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 5,
  },
  priceInput: {
    backgroundColor: Colors.BG_3,
    color: Colors.FG_1,
    borderRadius: 5,
    padding: 10,
    width: '40%',
    fontSize: 16,
  },
  
  percentChange: {
    color: Colors.FG_3,
    width: '25%',
    textAlign: 'right',
    fontSize: 14,
  },
  
  profitValue: {
    width: '30%',
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;